window.app_saku3_transaksi_siaga_hris_rekrut_fRekLowong = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_rekrut_fRekLowong.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_rekrut_fRekLowong";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Lowongan Pekerjaan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");

		this.pc1 = new pageControl(this,{bound:[10,12,1000,450], childPage:["Daftar Lowongan","Data Lowongan","Filter Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["Kode","Posisi","Jabatan","Keterangan","Tgl Mulai","Tgl Selesai"],
					colWidth:[[5,4,3,2,1,0],[80,80,300,200,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doGenerate"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Posisi", tag:1, maxLength:200});	
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Jumlah", tag:1, maxLength:10, tipeText:ttNilai});	
		this.cb_jab = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Jabatan",maxLength:10,multiSelection:false,tag:1});
		this.cb_unit = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Unit Kerja",maxLength:10,multiSelection:false,tag:2,change:[this,"doChange"]});
		this.cb_dept = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"Sub Direktorat",maxLength:10,multiSelection:false,tag:2});
		this.cb_dir = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Direktorat",maxLength:10,multiSelection:false,tag:2});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Keterangan", maxLength:200});		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,15,100,18],caption:"Tgl Dibuka", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,15,100,18],date:new Date().getDateStr()});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,16,100,18],caption:"Tgl Ditutup", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,16,100,18],date:new Date().getDateStr()});

		this.cb_lowong = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Low. Kerja",maxLength:10,multiSelection:false,tag:9,change:[this,"doChange"]});
		
		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_jab.setSQL("select kode_jab, nama from gr_jab where kode_lokasi='"+this.app._lokasi+"'",["kode_jab","nama"],false,["Kode","Nama"],"and","Data Jabatan",true);
			this.cb_lowong.setSQL("select kode_job, nama from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"'  and datediff(day,tgl_selesai,getdate()) < 30",["kode_job","nama"],false,["Kode","Nama"],"and","Data Lowongan",true);

			this.cb_dir.setSQL("select kode_dir, nama from gr_dir where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dir","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);
			this.cb_dept.setSQL("select kode_dept, nama from gr_dept where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_dept","nama"],false,["Kode","Nama"],"and","Data Departemen",true);
			this.cb_unit.setSQL("select kode_loker, nama from gr_loker where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Unit Kerja",true);

			this.doLoad();

			var data = this.dbLib.getDataProvider("select substring(convert(varchar,getdate(),112),3,4) as thnbulan",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];										
				this.thnBln = line.thnbulan;
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_rekrut_fRekLowong.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_rekrut_fRekLowong.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_rekrut_job(kode_job,nama,keterangan,tgl_mulai,tgl_selesai,kode_jab,kode_loker,tgl_input,nik_user,kode_lokasi, jumlah,kode_dept,kode_dir) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.cb_jab.getText()+"','"+this.cb_unit.getText()+"',getDate(),'"+this.app._userLog+"','"+this.app._lokasi+"', "+nilaiToFloat(this.e_jumlah.getText())+",'"+this.cb_dept.getText()+"','"+this.cb_dir.getText()+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update gr_rekrut_job set kode_dept='"+this.cb_dept.getText()+"',kode_dir='"+this.cb_dir.getText()+"',kode_loker='"+this.cb_unit.getText()+"',nama='"+this.e_nama.getText()+"',kode_jab='"+this.cb_jab.getText()+"',keterangan='"+this.e_ket.getText()+"',tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+"',tgl_input=getDate(),nik_user='"+this.app._userLog+"',jumlah="+nilaiToFloat(this.e_jumlah.getText())+" "+
						    "where kode_job='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rekrut_job where kode_job = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);					
					this.doLoad();
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
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(
							"select kode_loker,kode_dept,kode_dir,nama,keterangan,kode_jab,kode_loker,convert(varchar,tgl_mulai,103) as tgl_mulai,convert(varchar,tgl_selesai,103) as tgl_selesai,jumlah "+
				            "from gr_rekrut_job where kode_job ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.e_ket.setText(line.keterangan);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.cb_jab.setText(line.kode_jab);
						this.cb_unit.setText(line.kode_loker);
						this.cb_dept.setText(line.kode_dept);
						this.cb_dir.setText(line.kode_dir);
						this.e_jumlah.setText(floatToNilai(line.jumlah));						
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}

			if (sender == this.cb_lowong && this.cb_lowong.getText()!= "") {
				var strSQL = "select a.kode_job,a.nama,a.keterangan,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,c.nama as jabatan  "+
							 "from gr_rekrut_job a "+
							 " 		inner join gr_so c on a.kode_jab=c.kode_so and a.kode_lokasi=c.kode_lokasi "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_job='"+this.cb_lowong.getText()+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);	
			}	

			if (sender == this.cb_unit && this.cb_unit.getText()!="") {
				var data = this.dbLib.getDataProvider(
					"select b.kode_dept,b.kode_dir "+
					"from gr_loker a inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi "+
					"where a.kode_loker='"+ this.cb_unit.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_dept.setText(line.kode_dept);													
						this.cb_dir.setText(line.kode_dir);													
					} 						
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
	doGenerate:function(sender){
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rekrut_job","kode_job","L"+this.thnBln,"000"));
		this.e_nama.setFocus();
	},
	doLoad:function(sender){		
		var strSQL = "select a.kode_job,a.nama,a.keterangan,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,c.nama as jabatan  "+
					 "from gr_rekrut_job a "+
					 " 		inner join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and datediff(day,a.tgl_selesai,getdate()) < 30 order by a.kode_job desc";		
		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.pc1.setActivePage(this.pc1.childPage[0]);		
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
			this.sg1.appendData([line.kode_job,line.nama,line.jabatan,line.keterangan,line.tgl_mulai,line.tgl_selesai]); 
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
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	}
});
