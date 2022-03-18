window.app_saku3_transaksi_tu_kegiatan_fAjuKeg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kegiatan_fAjuKeg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kegiatan_fAjuKeg";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pengajuan Kegiatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;saiMemo");

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Pengajuan","List Pengajuan"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Pengajuan","Keterangan","Panitia","Nilai"],
					colWidth:[[3,2,1,0],[100,300,300,100]],
					colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Kegiatan", maxLength:20, tag:1,readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});													
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Deskripsi Kegiatan", maxLength:100, tag:1});						
		this.e_dasar = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Dasar Kegiatan", maxLength:100, tag:1});				
		this.e_sasar = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Sasaran Kegiatan", maxLength:100, tag:1});						
		this.e_tempat = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Tempat", maxLength:200, tag:1});								
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Jenis",tag:1,multiSelection:false});         				
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tanggal Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18]});	
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[270,13,100,18],caption:"Tanggal Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[370,13,98,18]});			
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[770,13,200,20],caption:"Tot. Pengajuan", tag:1,  readOnly:true, tipeText:ttNilai, text:"0"});				

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,990,254], childPage:["Budget","Rincian Kegiatan","Catatan Approval"]});		
		this.cb_panitia = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Panitia", multiSelection:false, tag:2});								
		this.cb_budget = new saiCBBL(this.pc2.childPage[0],{bound:[20,17,220,20],caption:"ID Budget", multiSelection:false, tag:2,change:[this,"doChange"]});
		this.cb_nik = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"NIK Panjar", multiSelection:false, tag:1});
		this.cb_app = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"NIK Approve", multiSelection:false, tag:2});
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"Saldo Budget", readOnly:true, tipeText:ttNilai, text:"0"});				

		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,tag:9,
		            colTitle:["Rincian Kegiatan","Nilai Pengajuan"],
					colWidth:[[1,0],[200,500]],														
					colFormat:[[1],[cfNilai]],		
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],	
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],									
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		

		this.e_memo = new saiMemo(this.pc2.childPage[2],{bound:[20,255,450,75],caption:"Cttn Approve",tag:9});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();

		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			
			var data = this.dbLib.getDataProvider("select substring(convert(varchar,getdate(),112),1,6) as periode ",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){				
					this.periode = line.periode;
				}					
			}	

			this.doClick();
			
			this.cb_app.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);												
			
			/*
			var strSQL = "select a.nik,a.nama "+
						 "from karyawan a inner join ( "+
						 "select distinct b.nik "+
						 "from karyawan a "+
						 "    inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "    inner join nik_panjar c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi "+ 
						 "where a.nik = '"+this.app._userLog+"' and a.kode_lokasi ='"+this.app._lokasi+"' "+
						 ") b on a.nik=b.nik and a.kode_lokasi ='"+this.app._lokasi+"' ";
			*/

			var strSQL = "select a.nik,a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi = '"+this.app._lokasi+"'";
			this.cb_nik.setSQL(strSQL,["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);															


			this.cb_panitia.setSQL("select kode_panitia, nama from keg_panitia_m where kode_lokasi = '"+this.app._lokasi+"'",["kode_panitia","nama"],false,["ID","Nama"],"and","Data Panitia",true);												
			//budget lintas lokasi
			this.cb_budget.setSQL("select kode_budget, nama from keg_budget where getdate() between tgl_awal and tgl_akhir",["kode_budget","nama"],false,["ID","Nama"],"and","Data Budget",true);			

			this.cb_jenis.setSQL("select kode_jenis, nama from keg_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["ID","Nama"],"and","Data Jenis",true);			
			
			this.e_memo.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_saku3_transaksi_tu_kegiatan_fAjuKeg.extend(window.childForm);
window.app_saku3_transaksi_tu_kegiatan_fAjuKeg.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){
					tot += nilaiToFloat(this.sg.cells(1,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 1 && this.sg.cells(1,row) != "") this.sg.validasi();
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
			if (this.stsSimpan == 1) this.doClick();					
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if(this.stsSimpan == 0){
						sql.add("delete from keg_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from keg_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}	
					
					sql.add("insert into keg_aju_m (no_aju,kode_lokasi,nik_user,tgl_input,periode,kode_panitia,kode_budget,keterangan,tgl_mulai,tgl_selesai, dasar,sasaran,tempat,nilai,progress,kode_lokapp,no_app,nik_app,nik_panjar,no_closing,kode_jenis) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.periode+"','"+this.cb_panitia.getText()+"','"+this.cb_budget.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"', '"+this.e_dasar.getText()+"','"+this.e_sasar.getText()+"','"+this.e_tempat.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'0','-','-','"+this.cb_app.getText()+"','"+this.cb_nik.getText()+"','-','"+this.cb_jenis.getText()+"')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into keg_aju_d (no_urut,no_aju,kode_lokasi,kegiatan,nilai, no_ref)  values "+
										"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+" ,'-')");
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
					sql.add("delete from keg_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from keg_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.doClick();		
				this.sg.clear(1);				
				this.sg1.clear(1);
				this.e_memo.setText("-");
				break;
				
			case "simpan" :	
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh nol atau kurang.");
					return false;						
				}	
				if (nilaiToFloat(this.e_saldo.getText()) < nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Transaksi tidak valid.","Saldo Budget kurang dari Nilai Pengajuan.");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},		
	doChange: function(sender){	
		if (sender == this.cb_budget && this.cb_budget.getText()!="") {
			var strSQL = "select a.nilai-isnull(b.pakai,0) as saldo "+
						"from keg_budget a left join ("+
						"   select kode_budget,sum(nilai) as pakai from keg_aju_m "+
						"   where no_aju<>'"+this.e_nb.getText()+"'  "+
						"	 group by kode_budget "+
						") b on a.kode_budget=b.kode_budget "+
						" where a.kode_budget ='"+this.cb_budget.getText()+"'";						   

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.e_saldo.setText(floatToNilai(line.saldo));
				}						
			}
		}
	},
	doClick: function(sender){	
		if (this.stsSimpan == 0) {
			this.sg.clear(1);				
			this.sg1.clear(1);											
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'keg_aju_m','no_aju',this.app._lokasi+"-KGT"+this.periode.substr(2,4)+".",'0000'));
		this.e_ket.setFocus();
		this.stsSimpan = 1;	
		setTipeButton(tbSimpan);
			
	},						
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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
			var strSQL = "select a.no_aju, a.keterangan, a.kode_panitia+' | '+b.nama as panitia, a.nilai "+
						 "from keg_aju_m a "+
						 "inner join keg_panitia_m b on a.kode_panitia=b.kode_panitia and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') and a.nik_user='"+this.app._userLog+"' ";							 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_aju,line.keterangan,line.panitia,floatToNilai(line.nilai)]); 							
			}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.dp_d1.setReadOnly(true);				

				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select a.*,isnull(b.catatan,'-') as cttn_app "+
							 "from keg_aju_m a "+    
							 "    left join keg_app_m b on a.no_app=b.no_app and b.no_flag='-' "+	
							 "where a.no_aju ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						
						this.e_ket.setText(line.keterangan);
						this.e_dasar.setText(line.dasar);
						this.e_sasar.setText(line.sasaran);
						this.e_tempat.setText(line.tempat);

						this.cb_panitia.setText(line.kode_panitia);
						this.cb_budget.setText(line.kode_budget);
						this.cb_app.setText(line.nik_app);
						this.cb_nik.setText(line.nik_panjar);
						this.cb_jenis.setText(line.kode_jenis);

						this.e_memo.setText(line.cttn_app);

					}
				}

				var strSQL = "select * from keg_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut";		 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.kegiatan,floatToNilai(line.nilai)]);
					}						
				} else this.sg.clear(1);
			}
		} catch(e) {alert(e);}
	}
});
