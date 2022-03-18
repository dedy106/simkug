window.app_dmt_transaksi_fKontrakE = function(owner)
{
	if (owner)
	{
		window.app_dmt_transaksi_fKontrakE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_dmt_transaksi_fKontrakE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kontrak: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Kontrak", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,400,20],caption:"No Dokumen", maxLength:50});								
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,400,20],caption:"Keterangan", maxLength:150});								
		this.cb_unbill = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun Unbill", multiSelection:false, maxLength:10, tag:2});
		this.cb_piutang = new saiCBBL(this,{bound:[20,16,200,20],caption:"Akun Piutang", multiSelection:false, maxLength:10, tag:2});
		this.cb_pdd = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun PDD", multiSelection:false, maxLength:10, tag:2});
		this.cb_pdpt = new saiCBBL(this,{bound:[20,19,200,20],caption:"Akun Pendapatan", multiSelection:false, maxLength:10, tag:2});		
		this.cb_cust = new saiCBBL(this,{bound:[20,16,200,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});								
		this.e_po = new saiCBBL(this,{bound:[20,15,420,20],caption:"No Kontrak", multiSelection:false, maxLength:100, tag:2});						
		this.e_nilai = new saiLabelEdit(this,{bound:[700,15,220,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		
		this.p1 = new panel(this,{bound:[20,19,900,260],caption:"Data Site"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:8,tag:0,
		            colTitle:["Site ID","Nama","Maintenance","Fee","Sewa","Cust SiteID","Tgl Mulai","Tgl Selesai"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,100,80,80,80,250,100]],					
					columnReadOnly:[true,[0,1],[2,3,4,5,6,7]],
					buttonStyle:[[0,6,7],[bsEllips,bsDate,bsDate]], 
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi ='"+this.app._lokasi+"' ",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_piutang.setSQL("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pdpt.setSQL("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_unbill.setSQL("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.cb_pdd.setSQL("select kode_akun, nama from masakun where kode_lokasi ='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_dmt_transaksi_fKontrakE.extend(window.childForm);
window.app_dmt_transaksi_fKontrakE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from dmt_kontrak_m where no_kontrak ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dmt_kontrak_d where no_kontrak ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dmt_bill_d where no_kontrak ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into dmt_kontrak_m(no_kontrak,tanggal,periode,no_dokumen,no_mou,kode_cust,nilai,akun_ar,akun_pdpt,akun_ppn,keterangan,kode_lokasi,nik_user,tgl_input,akun_unbill,akun_pdd) values " +
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_dok.getText()+"','"+this.e_po.getText()+"','"+this.cb_cust.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.cb_piutang.getText()+"','"+this.cb_pdpt.getText()+"','-','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.cb_unbill.getText()+"','"+this.cb_pdd.getText()+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into dmt_kontrak_d(no_kontrak,kode_lokasi,no_site,site_cust,rawat,fee,sewa,tgl_mulai,tgl_selesai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+",'"+this.sg.getCellDateValue(6,i)+"','"+this.sg.getCellDateValue(7,i)+"')");
							
								var perAwal = this.sg.getThnBln(6,i);
								var perAkhir = closePeriode(this.sg.getThnBln(7,i),12);
								
								var prd = perAwal;
								while (prd != perAkhir) {
									sql.add("insert into dmt_bill_d(no_kontrak,kode_lokasi,no_site,periode,rawat,fee,sewa,nilai_ar,no_akru,no_ar,akun_unbill,akun_pdpt) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+prd+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+","+parseNilai(this.sg.cells(4,i))+",0,'-','-','"+this.cb_unbill.getText()+"','"+this.cb_pdpt.getText()+"')");
									prd = closePeriode(prd,12);									
								}							
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
					this.sg.clear(1); 					
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.sg.validasi();
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data site untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);										
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Sewa tidak boleh nol atau kurang.");
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
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from dmt_kontrak_m where no_kontrak ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dmt_kontrak_d where no_kontrak ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dmt_bill_d where no_kontrak ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}		
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {												
			this.e_nb.setSQL("select no_kontrak, keterangan from dmt_kontrak_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kontrak","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.cb_cust && this.cb_cust.getText()!="") {
			this.e_po.setSQL("select no_mou, keterangan from dmt_mou where kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_mou","keterangan"],false,["No Kontrak","Keterangan"],"and","Daftar Kontrak",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {						
			var data = this.dbLib.getDataProvider(						
					   "select a.periode,a.tanggal,a.keterangan,a.akun_unbill,a.akun_ar,a.akun_pdd,a.akun_pdpt,a.kode_cust,a.no_mou,a.no_dokumen,g.keterangan as ket_mou, "+
					   "b.nama as nama_unbill,c.nama as nama_ar,d.nama as nama_pdd,e.nama as nama_pdpt,f.nama as nama_cust "+
					   "from dmt_kontrak_m a inner join masakun b on a.akun_unbill=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					   
					   "                     inner join masakun c on a.akun_ar=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					   
					   "                     inner join masakun d on a.akun_pdd=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+					   
					   "                     inner join masakun e on a.akun_pdpt=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+					   
					   "                     inner join cust f on a.kode_cust=f.kode_cust and a.kode_lokasi=f.kode_lokasi "+					   
					   "                     inner join dmt_mou g on a.no_mou=g.no_mou and a.kode_lokasi=g.kode_lokasi "+					   
					   "where a.no_kontrak='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);										
					this.e_ket.setText(line.keterangan);	
					this.cb_cust.setText(line.kode_cust,line.nama_cust);		
					this.cb_piutang.setText(line.akun_ar,line.nama_ar);		
					this.cb_pdpt.setText(line.akun_pdpt,line.nama_pdpt);		
					this.cb_unbill.setText(line.akun_unbill,line.nama_unbill);		
					this.cb_pdd.setText(line.akun_pdd,line.nama_pdd);							
					this.e_po.setText(line.no_mou,line.ket_mou);
				} 
			}

			var data = this.dbLib.getDataProvider("select a.no_site,b.nama,a.rawat,a.site_cust,a.rawat,a.fee,a.sewa,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai "+
						"from dmt_kontrak_d a inner join dmt_site b on a.no_site=b.no_site and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_kontrak = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_site,line.nama,floatToNilai(line.rawat),floatToNilai(line.fee),floatToNilai(line.sewa),line.site_cust,line.tgl_mulai,line.tgl_selesai]);
				}
			} else this.sg.clear(1);				
			
		}	
	},	
	doNilaiChange: function(){
		try{
			var tot1 = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(2,i) != "" && this.sg.cells(3,i) != "" && this.sg.cells(4,i) != ""){
					tot1 += nilaiToFloat(this.sg.cells(2,i)) + nilaiToFloat(this.sg.cells(3,i)) + nilaiToFloat(this.sg.cells(4,i));								
				}
			}
			this.e_nilai.setText(floatToNilai(tot1));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doChangeCell: function(sender, col, row){
		switch(col){			
			case 2 : 
			case 3 : 
			case 4 : 			
					this.sg.validasi();
				break;			
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){			
			case 6 : 
					if (this.sg.cells(6,row) == "" && row > 0) {						
						this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
					} 
					else {
						this.sg.setCell(6,row,this.dp_d1.getText());						
					}
				break;
			case 7 : 										
					if (this.sg.cells(7,row) == "") {										
						this.sg.setCell(7,row,this.sg.cells(6,row));												
					}
				break;
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Site",sender,undefined, 
												  "select no_site,nama from dmt_site where kode_lokasi='"+this.app._lokasi+"'",
												  "select no_site,nama from dmt_site where kode_lokasi='"+this.app._lokasi+"'",
												  ["no_site","nama"],"and",["Site ID","Keterangan"],false);
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();							
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);
			setTipeButton(tbUbahHapus);
		} catch(e) {
			alert(e);
		}
	}
});