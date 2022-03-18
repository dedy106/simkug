window.app_saku3_transaksi_uin_fRekapBelanja = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRekapBelanja.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRekapBelanja";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekap Pengajuan -  Belanja", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Data Pengajuan","Daftar Pengajuan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Total"],
					 colWidth:[[3,2,1,0],[100,300,100,100]],readOnly:true,
					 colFormat:[[3],[cfNilai]],
					 dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"No Dokumen", maxLength:200});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Keterangan", maxLength:200});				
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Total Rekap", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,314], childPage:["RAB Pengajuan","Otorisasi","RAB Pengajuan"]});								
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:0,
		            colTitle:["Status","No Pengajuan","Tanggal","Deskripsi","Akun","Nilai","Detail"],
					colWidth:[[6,5,4,3,2,1,0],[50,100,250,290,80,100,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],					
					colFormat:[[5,6],[cfNilai,cfButton]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["REKAP","OPEN"]})]],
					dblClick:[this,"doDoubleClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],	
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],									
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		

		this.cb_tahu = new saiCBBL(this.pc2.childPage[1],{bound:[20,10,220,20],caption:"Diketahui Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_bdh = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"NIK BDH", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});

		this.sg3 = new saiGrid(this.pc2.childPage[2],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:12,tag:9,
					colTitle:["Kd Penerima","Nama","Deskripsi","Kd Norma","Norma","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,60,60,60,150,60,200,150,70]],					
					readOnly:true,
					colFormat:[[6,7,8,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[2],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;		
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_tahu.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				
			this.cb_tahu.setText(this.app._userLog);
			this.cb_bdh.setSQL("select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRekapBelanja.extend(window.childForm);
window.app_saku3_transaksi_uin_fRekapBelanja.implement({	
	doLoadAju: function() {
		var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kdakun+' | '+b.nmakun as akun, a.nilai "+
					 "from uin_aju_m a inner join uin_akun b on a.kode_akun=b.kdakun "+
					 "where a.progress in ('0') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_aju";							 											 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg.appendData(["OPEN",line.no_aju,line.tgl,line.keterangan,line.akun,floatToNilai(line.nilai),"Detail"]);
			}					
		} else this.sg.clear(1);
	},
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_rekap_m where no_rekap = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("update uin_aju_m set no_rekap='-',progress='0' where no_rekap = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}
					
					sql.add("insert into uin_rekap_m (no_rekap,kode_lokasi,tanggal,periode,nik_user,tgl_input,no_dokumen,keterangan,kode_pp,nik_tahu,jab_tahu,nik_bdh,jab_bdh,nilai,progress,no_ver,no_kas) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_tahu.getText()+"','-','"+this.cb_bdh.getText()+"','-',"+nilaiToFloat(this.e_total.getText())+",'0','-','-')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "REKAP") {
								sql.add("update uin_aju_m set no_rekap='"+this.e_nb.getText()+"',progress='1' where no_aju='"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_rekap_m where no_rekap = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update uin_aju_m set no_rekap='-',progress='0' where no_rekap = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg3.clear(1);
					setTipeButton(tbAllFalse);	
					this.doLoadAju();	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.sg.validasi();				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Rekap Pengajuan tidak boleh nol atau kurang.");
					return false;
				}
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
			this.doLoadAju();	
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_rekap_m","no_rekap",this.app._lokasi+"-RK"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},		
	doChange: function(sender){
		if (sender==this.cb_pp && this.cb_pp.getText()!="") {			
			this.cb_tahu.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
		}
	},	
	doChangeCell: function(sender, col, row){
		try {
			if (col == 0) this.sg.validasi();						
		}
		catch(e) {
			alert(e);
		}	
	},
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(0,i) == "REKAP"){					
					tot += nilaiToFloat(this.sg.cells(5,i));						
				}
			}
			this.e_total.setText(floatToNilai(tot));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 6) {
				var strSQL = "select a.*,b.nama,c.nama as atensi, a.total+a.ppn-a.pph as neto "+
							"from uin_aju_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
							"				   inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_aju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_atensi,line.atensi,line.keterangan,line.kode_norma,line.nama,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto)]);
					}					
				} else this.sg3.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[2]);		
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "OPEN") this.sg.cells(0,row,"REKAP");
		else this.sg.cells(0,row,"OPEN");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){	
		try{		
			var strSQL = "select a.no_rekap,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
						 "from uin_rekap_m a "+
						 "where a.progress in ('0') and a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and a.kode_pp='"+this.cb_pp.getText()+"' order by a.no_rekap desc";							 						

			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_rekap,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from uin_rekap_m where no_rekap='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.keterangan);

						this.cb_tahu.setText(line.nik_tahu);	
						this.cb_bdh.setText(line.nik_bdh);	
					} 
				}			
				
				var strSQL = "select a.no_aju,convert(varchar,a.tanggal,103) as tgl,a.keterangan,b.kdakun+' | '+b.nmakun as akun, a.nilai "+
							 "from uin_aju_m a inner join uin_akun b on a.kode_akun=b.kdakun "+
							 "where a.no_rekap='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_aju";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData(["REKAP",line.no_aju,line.tgl,line.keterangan,line.akun,floatToNilai(line.nilai),"Detail"]);
					}					
				} else this.sg.clear(1);	
				this.sg.validasi();
				
			}
		} catch(e) {alert(e);}
	}	
});