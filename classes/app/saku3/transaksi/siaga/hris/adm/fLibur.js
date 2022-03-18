window.app_saku3_transaksi_siaga_hris_adm_fLibur = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fLibur.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fLibur";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hari Libur Tahunan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);
		this.e_tahun = new saiLabelEdit(this,{bound:[20,10,180,20],caption:"Tahun", maxLength:4,change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this,{bound:[20,13,1000,430], childPage:["Data Hari Libur","Daftar Hari Libur"]});	
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Kode",maxLength:10,tag:0,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,500,20],caption:"Nama", maxLength:250,tag:0});		
		this.l_tglawal = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tanggal Mulai", underline:true});
		this.dp_dawal = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,100,18],date:new Date().getDateStr()}); 
		this.l_tglakhir = new portalui_label(this.pc1.childPage[0],{bound:[20,17,100,18],caption:"Tanggal Selesai", underline:true});
		this.dp_dakhir = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,17,100,18],date:new Date().getDateStr()}); 

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Tgl Mulai","Tgl Akhir"],
					colWidth:[[3,2,1,0],[120,120,400,100]],			
					readOnly:true,	
		            dblClick:[this,"doDoubleClick"],							
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,pager:[this,"doPager"]});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			var strSQL = "select convert(varchar(4), GETDATE(),112) as thn";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.e_tahun.setText(line3.thn);	
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fLibur.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fLibur.implement({
	
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					//sql.add("delete from gr_libur where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
					sql.add("insert into gr_libur(kode_libur,kode_lokasi,nama,tahun,tgl_mulai,tgl_akhir) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_tahun.getText()+"','"+this.dp_dawal.getDateString()+"','"+this.dp_dakhir.getDateString()+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {		
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from gr_libur where kode_libur='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
					sql.add("insert into gr_libur(kode_libur,kode_lokasi,nama,tahun,tgl_mulai,tgl_akhir) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_tahun.getText()+"','"+this.dp_dawal.getDateString()+"','"+this.dp_dakhir.getDateString()+"')");
					
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
					sql.add("delete from gr_libur where kode_libur='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_tahun);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
				break;
			case "simpan" :	
				this.simpan();
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
			if (this.e_tahun.getText() != "") {
				var strSQL = "select kode_libur,nama,convert(varchar,tgl_mulai,103) as tgl_mulai1,convert(varchar,tgl_akhir,103) as tgl_akhir1 "+
							"from gr_libur "+							
							"where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_tahun.getText()+"'  order by tgl_mulai1 desc";
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);
			}
			if (this.cb_kode && this.cb_kode.getText() != "") {
				var data = this.dbLib.getDataProvider("select nama,tgl_mulai,tgl_akhir "+
				           " from gr_libur where kode_libur ='"+this.cb_kode.getText()+"' and tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);
						this.dp_dawal.setText(line.tgl_mulai);
						this.dp_dakhir.setText(line.tgl_akhir);
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				}
			}
		} catch(e) {alert(e);}
	},

	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_libur,line.nama,line.tgl_mulai1,line.tgl_akhir1]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_kode.setText(this.sg.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Tahun : "+ this.e_tahun.getText()+")");							
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