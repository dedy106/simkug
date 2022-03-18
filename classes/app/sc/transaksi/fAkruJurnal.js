window.app_sc_transaksi_fAkruJurnal = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fAkruJurnal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fAkruJurnal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Akru Jurnal: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});								
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Range Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 
		this.dp_d3 = new portalui_datePicker(this,{bound:[240,11,100,18]}); 		
		this.e_total = new saiLabelEdit(this,{bound:[800,11,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[670,11,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_appAll = new portalui_imageButton(this,{bound:[760,11,20,20],hint:"Jurnal",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doJurnal"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,347], childPage:["Data PO","Detail PO","Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:0,		            
					colTitle:["No PO","Keterangan","Tanggal","Vendor","Kode Akun","Nilai","PPN","Total"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,80,150,70,270,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["No Pesan","Cost Center","Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,60,250,150,80,200,100]],					
					readOnly:true,					
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Nilai","Jenis","Kode CC"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,60,450,120]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					colFormat:[[3],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});		
		
		
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fAkruJurnal.extend(window.childForm);
window.app_sc_transaksi_fAkruJurnal.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_jurnal_m","no_jurnal",this.app._lokasi+"-JRN"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sc_jurnal_m(no_jurnal,tanggal,keterangan,periode,nik_user,tgl_input,tgl_awal,tgl_akhir) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')");					
					sql.add("update sc_po_m set no_jurnal='"+this.e_nb.getText()+"' where tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and no_jurnal='-'");					
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i) && this.sg3.cells(3,i) != "0"){
								sql.add("insert into sc_jurnal_j(no_jurnal,kode_akun,dc,nilai,jenis,kode_cc) values "+
										"('"+this.e_nb.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(2,i)+"',"+parseNilai(this.sg3.cells(3,i))+",'"+this.sg3.cells(4,i)+"','"+this.sg3.cells(5,i)+"')");								
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1); 	
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				  this.simpan();
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
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_jurnal_m","no_jurnal",this.app._lokasi+"-JRN"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {						
			this.sg.clear(1); 						
			this.sg2.clear(1); 	
			this.dataJU.rs.rows = [];
		}		
	},
	doLoad:function(sender){
		if (this.e_periode.getText()!="") {
			var strSQL = "select a.no_po,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,a.kode_vendor+' - '+b.nama as vendor,c.kode_akun,a.nilai,a.ppn,(a.nilai+a.ppn) as total "+
			             "from sc_po_m a inner join sc_karyawan b on a.nik_buat=b.nik "+
						 "               inner join sc_jenis c on a.kode_jenis=c.kode_jenis "+						 
						 "where a.no_jurnal='-' and a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
				
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){				
					line = this.dataJU.rs.rows[i];				
					tot += parseFloat(line.total);
				}
				this.e_total.setText(floatToNilai(tot));							
			} else this.sg.clear(1);		
		}
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																	
			this.sg.appendData([line.no_po,line.keterangan,line.tanggal,line.vendor,line.kode_akun,floatToNilai(line.nilai),floatToNilai(line.ppn),floatToNilai(line.total)]);
		}
		this.sg.setNoUrut(start);
	},		
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			this.sg2.clear(); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			var strSQL = "select a.no_pesan,e.kode_cc+' - '+e.nama as cc,a.kode_brg,b.nama as nama_brg,b.tipe,b.satuan,a.harga,a.jumlah,(a.jumlah*a.harga) as total "+
			             "from sc_pesan_d a inner join sc_barang b on a.kode_brg=b.kode_brg "+						 
						 "                  inner join sc_pesan_m d on a.no_pesan=d.no_pesan "+
						 "                  inner join sc_cc e on d.kode_cc=e.kode_cc "+		
						 "where a.no_po='"+this.sg.cells(0,row) +"' order by a.no_urut";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.no_pesan,line.cc,line.kode_brg,line.nama_brg,line.tipe,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total)]);
				}
			} else this.sg2.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);					
		}
	},
	doJurnal:function(sender){		
		this.sg3.clear(); 		
		var strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.nilai,a.jenis,a.kode_cc from "+
					 "( "+
					 "select c.kode_akun,'D' as dc,sum(a.jumlah*a.harga) as nilai,'BEBAN' as jenis,b.kode_cc "+
					 "from sc_pesan_d a inner join sc_pesan_m b on a.no_pesan=b.no_pesan "+
					 "                  inner join sc_jenis c on b.kode_jenis=c.kode_jenis "+
					 "				    inner join sc_po_m d on a.no_po=d.no_po "+
					 "where d.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and d.no_jurnal='-' "+
					 "group by c.kode_akun,b.kode_cc "+
					 "union "+
					 "select '11700000' kode_akun,'D' as dc,sum(a.ppn) as nilai,'PPN' as jenis,'-' as kode_cc "+
					 "from sc_po_m a "+					 
					 "where a.tanggal between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"' and a.no_jurnal='-' "+					 
					 ") a inner join masakun b on a.kode_akun=b.kode_akun ";					
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),line.kode_cc]);
			}
		}		
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
