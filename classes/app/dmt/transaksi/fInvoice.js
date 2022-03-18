window.app_dmt_transaksi_fInvoice = function(owner)
{
	if (owner)
	{
		window.app_dmt_transaksi_fInvoice.prototype.parent.constructor.call(this,owner);
		this.className  = "app_dmt_transaksi_fInvoice";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Invoice: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Invoice",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_fp = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Faktur Pajak", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Due Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18],date:new Date().getDateStr()}); 
		this.cb_app = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cust = new saiCBBL(this,{bound:[20,15,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_kontrak = new saiCBBL(this,{bound:[20,17,220,20],caption:"Kontrak", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_ppn = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bJurnal = new button(this,{bound:[618,17,80,18],caption:"Jurnal",click:[this,"doJurnalClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,280], childPage:["Data Site","Detail Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
				colTitle:["No Site","Nama","Cust SiteID","Periode","No Akru","Nilai","Nilai Inv"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,250,100]],
				columnReadOnly:[true,[0,1,2,3,4,5],[6]],
				colFormat:[[5,6],[cfNilai,cfNilai]],
				buttonStyle:[[0,3],[bsEllips,bsAuto]], 
				nilaiChange:[this,"doNilaiChange"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis"],
					colWidth:[[5,4,3,2,1,0],[80,100,260,50,250,100]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_spro='PPNK' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.akunppn = line.flag;				
				this.namappn = line.nama;				
			} 
			else {
				system.alert(this,"Akun PPN Keluaran tidak ditemukan.","Setting di Sistem Prosedur untuk Kode PPNK.");
				setTipeButton(tbAllFalse);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_dmt_transaksi_fInvoice.extend(window.childForm);
window.app_dmt_transaksi_fInvoice.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_ar_m","no_ar",this.app._lokasi+"-INV"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();				
					sql.add("insert into dmt_ar_m(no_ar,kode_lokasi,periode,tanggal,no_dokumen,no_fp,keterangan,kode_pp,modul,jenis,kode_curr,kurs,kode_cust,no_kontrak,akun_ar,nilai,ppn,posted,tgl_input,nik_user,dc,due_date,nik_app) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_fp.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','AR','INV','IDR',1,'"+this.cb_cust.getText()+"','"+this.cb_kontrak.getText()+"','"+this.akunar+"',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_ppn.getText())+",'F',getdate(),'"+this.app._userLog+"','D','"+this.dp_d2.getDateString()+"','"+this.cb_app.getText()+"')");					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != "0"){
								sql.add("insert into dmt_ar_j(no_ar,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','ARINV','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");								
							}
						}
					}					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(6,i) != "0"){								
								sql.add("update dmt_bill_d set no_ar='"+this.e_nb.getText()+"',nilai_ar ="+parseNilai(this.sg.cells(6,i))+" where no_ar='-' and no_site ='"+this.sg.cells(0,i)+"' and no_kontrak='"+this.cb_kontrak.getText()+"' and periode='"+this.sg.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								if (this.sg.cells(3,i) == this.e_periode.getText() && this.sg.cells(4,i)=="-") 
									sql.add("update dmt_bill_d set no_akru='"+this.e_nb.getText()+"' where no_akru='-' and no_ar='"+this.e_nb.getText()+"' and no_site ='"+this.sg.cells(0,i)+"' and no_kontrak='"+this.cb_kontrak.getText()+"' and periode='"+this.sg.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");								
							}
						}
					}				
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1);this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if ((this.sg.cells(0,j)+this.sg.cells(3,j)) == (this.sg.cells(0,i)+this.sg.cells(3,i)) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data periode untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}				
				this.doJurnalClick();
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},	
	doJurnalClick:function(sender){				
		if (this.e_ket.getText() != "") {
			this.sg2.clear();
			if (this.piu != 0) this.sg2.appendData([this.akunar,this.namaar,'D',this.e_ket.getText(),floatToNilai(this.piu),"PIU"]);
			if (this.unbill != 0) this.sg2.appendData([this.akununbill,this.namaunbill,'C',this.e_ket.getText(),floatToNilai(this.unbill),"UNBL"]);
			if (this.pdpt != 0) this.sg2.appendData([this.akunpdpt,this.namapdpt,'C',this.e_ket.getText(),floatToNilai(this.pdpt),"PDPT"]);
			if (this.pdd != 0) this.sg2.appendData([this.akunpdd,this.namapdd,'C',this.e_ket.getText(),floatToNilai(this.pdd),"PDD"]);
			if (this.rev != 0) {
				this.sg2.appendData([this.akununbill,this.namaunbill,'C',this.e_ket.getText(),floatToNilai(this.rev),"UNBREV"]);
				this.sg2.appendData([this.akunpdpt,this.namapdpt,'D',this.e_ket.getText(),floatToNilai(this.rev),"PDPTREV"]);
			}
			this.sg2.appendData([this.akunppn,this.namappn,'C',this.e_ket.getText(),this.e_ppn.getText(),"PPN"]);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"Deskripsi tidak valid.","Harap diisi.");
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dmt_ar_m","no_ar",this.app._lokasi+"-INV"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {
			this.sg.clear(1);			
			this.cb_kontrak.setSQL("select no_kontrak,no_dokumen from dmt_kontrak_m where kode_cust ='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kontrak","no_dokumen"],false,["Kontrak","Dokumen"],"and","Data Kontrak",true);			
		}
		if (sender == this.cb_kontrak && this.cb_kontrak.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.akun_ar,a.akun_pdpt,a.akun_unbill,a.akun_pdd, "+
						"b.nama as nama_ar,c.nama as nama_pdpt,d.nama as nama_unbill,e.nama as nama_pdd "+
						"from dmt_kontrak_m a inner join masakun b on a.akun_ar=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                     inner join masakun c on a.akun_pdpt=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						"                     inner join masakun d on a.akun_unbill=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
						"                     inner join masakun e on a.akun_pdd=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
						"where a.no_kontrak='"+this.cb_kontrak.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];											
				this.akunar = line.akun_ar;
				this.namaar = line.nama_ar;
				this.akunpdpt = line.akun_pdpt;
				this.namapdpt = line.nama_pdpt;
				this.akununbill = line.akun_unbill;
				this.namaunbill = line.nama_unbill;
				this.akunpdd = line.akun_pdd;
				this.namapdd = line.nama_pdd;
			}			
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			var data = this.dbLib.getDataProvider("select site_cust from dmt_kontrak_d where no_site ='"+this.sg.cells(0,row)+"' and no_kontrak='"+this.cb_kontrak.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.sg.cells(2,row,line.site_cust);
			}			
			var data = this.dbLib.getDataProvider("select periode from dmt_bill_d where no_ar ='-' and no_kontrak ='"+this.cb_kontrak.getText()+"' and no_site = '"+this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"' order by periode",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				var values = [];				
				for (var i in data.rs.rows){									
					values[values.length] = data.rs.rows[i].periode;
				}
			} 						
			this.sg.columns.get(3).pickList.clear();
			for (var v in values) {
				this.sg.columns.get(3).pickList.set(v,values[v]);
			}			
		}
		if (col == 3) {
			var data = this.dbLib.getDataProvider("select no_akru,(rawat+fee+sewa) as nilai from dmt_bill_d where no_ar ='-' and periode ='"+this.sg.cells(3,row)+"' and no_site ='"+this.sg.cells(0,row)+"' and no_kontrak='"+this.cb_kontrak.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.sg.cells(4,row,line.no_akru);
				this.sg.cells(5,row,floatToNilai(line.nilai));
				this.sg.cells(6,row,floatToNilai(line.nilai));
			}
			this.sg.validasi();
		}
		if (col == 6) this.sg.validasi();
	},
	doEllipsClick: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Site",sender,undefined, 
											  "select a.no_site,a.nama    from dmt_site a inner join dmt_kontrak_d b on a.no_site=b.no_site and a.kode_lokasi=b.kode_lokasi "+
											  "where b.no_kontrak='"+this.cb_kontrak.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",											  
											  "select count(a.no_site)  from dmt_site a inner join dmt_kontrak_d b on a.no_site=b.no_site and a.kode_lokasi=b.kode_lokasi "+
											  "where b.no_kontrak='"+this.cb_kontrak.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",
											  ["a.no_site","a.nama"],"and",["Site ID","Nama"],false);				
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doNilaiChange: function(){
		try{
			this.piu=this.pdpt=this.pdd=this.unbill=this.rev=0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "") {
					tot += nilaiToFloat(this.sg.cells(6,i));
					if (this.sg.cells(4,i) == "-") {
						if (this.sg.cells(3,i) == this.e_periode.getText()) this.pdpt += nilaiToFloat(this.sg.cells(6,i));
						else this.pdd += nilaiToFloat(this.sg.cells(6,i));
					}
					else {
						this.unbill += nilaiToFloat(this.sg.cells(6,i));
						if (nilaiToFloat(this.sg.cells(5,i)) != nilaiToFloat(this.sg.cells(6,i))) this.rev += nilaiToFloat(this.sg.cells(5,i));
					}
				}
			}
			this.e_total.setText(floatToNilai(tot));			
			this.e_ppn.setText(floatToNilai(Math.round(tot*10/100)));			
			this.piu = nilaiToFloat(this.e_total.getText())+nilaiToFloat(this.e_ppn.getText());
			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							//this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});