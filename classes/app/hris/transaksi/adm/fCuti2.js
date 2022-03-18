window.app_hris_transaksi_adm_fCuti2 = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fCuti2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fCuti2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Cuti: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Cuti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_cuti = new saiCBBL(this,{bound:[20,13,200,20],caption:"Jenis Cuti", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.l_tgl2 = new portalui_label(this,{bound:[20,14,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,14,100,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]}); 
		this.l_tgl3 = new portalui_label(this,{bound:[20,15,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this,{bound:[120,15,100,18],date:new Date().getDateStr(),selectDate:[this,"doSelectDate2"]}); 
		this.e_lama = new saiLabelEdit(this,{bound:[20,16,180,20],caption:"Jumlah Hari", tipeText:ttNilai, text:"0", readOnly:true});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:2});
		this.i_hitung = new portalui_imageButton(this,{bound:[475,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_alasan = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Alasan Cuti", maxLength:200});				
		
		this.p1 = new panel(this,{bound:[10,23,460,200],caption:"Daftar Tanggal Cuti",visible:true});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:1,tag:9,
		            colTitle:["Tanggal"],
					colWidth:[[0],[100]],															
					autoAppend:true,defaultRow:1});		

		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_cuti.setSQL("select sts_cuti, nama from gr_status_cuti where kode_lokasi='"+this.app._lokasi+"'",["sts_cuti","nama"],false,["Kode","Nama"],"and","Data Jenis Cuti",true);						
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Verifikasi",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fCuti2.extend(window.childForm);
window.app_hris_transaksi_adm_fCuti2.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti_d","no_cuti",this.app._lokasi+"-CBER"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_cuti_d(no_cuti,kode_lokasi,periode,tanggal,sts_cuti,tgl_mulai,tgl_selesai,alasan,nik,tgl_input,nik_user,lama,nik_app)  "+						         
							"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_cuti.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_alasan.getText()+"',nik,getdate(),'"+this.app._userLog+"',"+parseNilai(this.e_lama.getText())+",'"+this.cb_app.getText()+"' from gr_karyawan where flag_aktif <> 'X'"); 							
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',nik,'"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 08:00:00','I','CUTI', '"+this.e_nb.getText()+"' from gr_karyawan where flag_aktif <>'X'"); 
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) "+
									"select '"+this.e_nb.getText()+"','"+this.app._lokasi+"',nik,'"+this.sg.cells(0,i)+"','"+this.sg.cells(0,i)+" 08:00:00','O','CUTI', '"+this.e_nb.getText()+"' from gr_karyawan where flag_aktif <>'X' "); 
						}
					}
					//setTipeButton(tbAllFalse);					
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				 this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){	
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doSelectDate2: function(sender, y,m,d){			
		this.e_lama.setText("0");
		this.sg.clear(1);
	},		
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_cuti_d","no_cuti",this.app._lokasi+"-CBER"+this.e_periode.getText().substr(2,4)+".","000"));
			this.cb_cuti.setFocus();
		}	
		else{		
			var data = this.dbLib.getDataProvider("select datediff(day,'"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"')+1 as jumlah",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				var jumlah = parseInt(line.jumlah);
			}		
			if (this.cb_cuti.getText() == "1") {
				var data = this.dbLib.getDataProvider("select isnull(sum(datediff(day,tgl_mulai,tgl_akhir)+1),0) as libur from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and tgl_mulai between '"+this.dp_d2.getDateString()+"' and '"+this.dp_d3.getDateString()+"'",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];				
					
					var lama = jumlah - parseInt(line.libur);
					this.e_lama.setText(floatToNilai(lama));					
				}				
			}
			this.sg.clear(1);
			var j = 0;
			var tanggal = "";
			for (var i=0;i < jumlah;i++){			
				var data = this.dbLib.getDataProvider("select dateadd(day,"+i+",'"+this.dp_d2.getDateString()+"') as tanggal",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];		
					if (this.cb_cuti.getText() == "1") {
						var data2 = this.dbLib.getDataProvider("select tgl_mulai from gr_libur where tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"' and '"+line.tanggal+"' between tgl_mulai and tgl_akhir",true);			
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){						
						} 
						else {
							tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
							this.sg.cells(0,j,tanggal);
							this.sg.appendRow(1);
							j++;
						}
					} 
					else {
						tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
						this.sg.cells(0,j,tanggal);
						this.sg.appendRow(1);
						j++;
					}
				}
			}		
		}
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});