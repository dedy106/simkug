window.app_saku3_transaksi_sai_job_fJobDetail = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sai_job_fJobDetail.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sai_job_fJobDetail";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rektorat", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Job","Detail Job","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Kode Job","Nama Job","Customer"],
					colWidth:[[2,1,0],[300,500,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Job",readOnly:true, maxLength:10,change:[this,"doChange"],tag:0});
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:10,tag:9,
				colTitle:["Rincian Job","Keterangan","Status","Ref ID","PIC Client","Tgl Mulai","Tgl Selesai","Kode Menu","File JS","Nama Table"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,200,100,100,100,200,80,80,300,400]],																						
				buttonStyle:[[2,5,6],[bsAuto,bsDate,bsDate]],
				cellEnter:[this,"doCellEnter"],
				picklist:[[2],[new portalui_arrayMap({items:["PROGRESS","OK","NOTOK"]})]], 	
				pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],									
				autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		


		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_kode.setSQL("select kode_job, nama from sai_job_m where kode_lokasi='"+this.app._lokasi+"' ",["kode_job","nama"],false,["Kode","Nama"],"and","Data Job",false);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sai_job_fJobDetail.extend(window.childForm);
window.app_saku3_transaksi_sai_job_fJobDetail.implement({
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
					sql.add("delete from sai_job_d where kode_job='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"'");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("insert into sai_job_d(nu,kode_job,kode_lokasi,nik,nama,keterangan,kode_menu,file_js,nama_table,pic,status,nu_ref,tgl_mulai,tgl_selesai) values "+
										"("+i+",'"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(7,i)+"','"+this.sg.cells(8,i)+"','"+this.sg.cells(9,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"',"+this.sg.cells(3,i)+",'"+this.sg.getCellDateValue(5,i)+"','"+this.sg.getCellDateValue(6,i)+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.doLoad();
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select *,convert(varchar,tgl_mulai,103) as tgl1,convert(varchar,tgl_selesai,103) as tgl2 from sai_job_d where kode_job = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.app._userLog+"' order by nu";		 							
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.sg.appendData([line.nama,line.keterangan,line.status,line.nu_ref,line.pic,line.tgl1,line.tgl2,line.kode_menu,line.file_js,line.nama_table]);
					}						
				} else this.sg.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"PROGRESS");						
					}
				break;						
			case 5 : 
					if (this.sg.cells(5,row) == "") {
						this.sg.setCell(5,row,this.dp_d1.getText());
						this.sg.setCell(6,row,this.dp_d1.getText());
					}					
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));				
			}
		} catch(e) {alert(e);}
	},
	doCari:function(sender){								
		if (this.e_kode2.getText() != "") var filter = " a.kode_rek like '%"+this.e_kode2.getText()+"%' and ";
		else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
		var strSQL = "select a.kode_job,a.nama,b.nama as cust from sai_job_m a inner join sai_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi where "+filter+" a.kode_lokasi ='"+this.app._lokasi+"' order by a.kode_job";				
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doLoad:function(sender){	
		this.sg.clear(1);					
		var strSQL = "select a.kode_job,a.nama,b.nama as cust from sai_job_m a inner join sai_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi ='"+this.app._lokasi+"' order by a.kode_job";				
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_job,line.nama,line.cust]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});