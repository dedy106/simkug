window.app_saku3_transaksi_siaga_hris_fSO = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_fSO.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_fSO";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Struktur Organisasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,450], childPage:["View Data","Insert [Copy-Paste]"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:9,
					colTitle:["Kode","Deskripsi","Lvl Spasi","Lvl Lap","Tipe","Sum Header","Kode Induk","RowIndex","Tgl Awal","Tgl Akhir"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,60,90,80,60,60,60,300,90]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.sg = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:1,
					colTitle:["Kode","Deskripsi","Lvl Spasi","Lvl Lap","Tipe","Sum Header","Kode Induk","RowIndex","Tgl Awal","Tgl Akhir"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,60,90,80,60,60,60,300,90]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"],
					readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg, pager:[this,"doPage"]});		

		this.rearrangeChild(10, 23);				
		setTipeButton(tbSimpan);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.doLoad();					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_fSO.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_fSO.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();									
					
					sql.add("delete from gr_so where kode_lokasi='"+this.app._lokasi+"'");	

					for (var i=0;i < this.sg.getRowCount();i++){	
						sql.add("insert into gr_so(kode_so,kode_lokasi,nama,level_spasi,level_lap,tipe,sum_header,kode_induk,rowindex,tgl_awal,tgl_akhir) values "+
									"('"+this.sg.cells(0,i)+"','"+this.app._lokasi+"','"+this.sg.cells(1,i)+"',"+parseNilai(this.sg.cells(2,i))+","+parseNilai(this.sg.cells(3,i))+",'"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(6,i)+"',"+parseNilai(this.sg.cells(7,i))+",'"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"')");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),undefined);
				setTipeButton(tbSimpan);
				this.sg.clear(1);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);					
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;					
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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
		var strSQL = "select * from gr_so where kode_lokasi ='"+this.app._lokasi+"' order by rowindex";		
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
		var nama = "";
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];			
			
			if (line.level_spasi == 0) nama = line.nama;
			if (line.level_spasi == 1) nama = "_"+line.nama;
			if (line.level_spasi == 2) nama = "__"+line.nama;
			if (line.level_spasi == 3) nama = "___"+line.nama;
			if (line.level_spasi == 4) nama = "____"+line.nama;
			if (line.level_spasi == 5) nama = "_____"+line.nama;
			if (line.level_spasi == 6) nama = "______"+line.nama;
			if (line.level_spasi == 7) nama = "_______"+line.nama;
			if (line.level_spasi == 8) nama = "________"+line.nama;
			if (line.level_spasi == 9) nama = "_________"+line.nama;
			
			this.sg1.appendData([line.kode_so,nama,line.level_spasi,line.level_lap,line.tipe,line.sum_header,line.kode_induk,line.rowindex,line.tgl_awal,line.tgl_akhir]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
